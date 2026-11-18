import io
import os
import uuid
from pathlib import Path
from datetime import datetime

from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

# In-memory storage for generated PDFs
PDF_STORAGE = {}

def sanitize_for_pdf(text: str) -> str:
    """Ensure text is safe for ReportLab without font crashes."""
    if not text:
        return ""
    # Replace common unicode quotes and symbols with standard equivalents
    text = (
        text.replace("’", "'")
        .replace("‘", "'")
        .replace("“", '"')
        .replace("”", '"')
        .replace("–", "-")
        .replace("—", "-")
        .replace("₹", "Rs. ")
    )
    # Filter characters to safe printable ASCII/Latin
    safe_chars = []
    for c in text:
        if ord(c) < 256:
            safe_chars.append(c)
        else:
            safe_chars.append(" ")
    return "".join(safe_chars)

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_footer(num_pages)
            super().showPage()
        super().save()

    def draw_footer(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748B"))
        # Footer text
        disclaimer = "Generated via Sahukar Shield (Consumer Protection Tool) | Informational draft for official submission"
        self.drawString(54, 36, disclaimer)
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(612 - 54, 36, page_str)
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.5)
        self.line(54, 48, 612 - 54, 48)
        self.restoreState()

def generate_complaint_pdf(complainant: dict, loan: dict, timeline: list, evidence: list, draft_text: str = "") -> str:
    """Generate professional PDF complaint document and return unique PDF ID."""
    pdf_id = str(uuid.uuid4())
    buffer = io.BytesIO()

    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        leftMargin=40,
        rightMargin=40,
        topMargin=40,
        bottomMargin=54,
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        "DocTitle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=15,
        leading=18,
        textColor=colors.HexColor("#0B1F3A"),
    )

    subtitle_style = ParagraphStyle(
        "DocSubTitle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=10,
        leading=13,
        textColor=colors.HexColor("#DC2626"),
    )

    h2_style = ParagraphStyle(
        "Heading2",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=11,
        leading=15,
        textColor=colors.HexColor("#0B1F3A"),
        spaceBefore=8,
        spaceAfter=4,
    )

    body_style = ParagraphStyle(
        "Body",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9,
        leading=12,
        textColor=colors.HexColor("#1E293B"),
    )

    bold_body_style = ParagraphStyle(
        "BoldBody",
        parent=body_style,
        fontName="Helvetica-Bold",
    )

    cell_style = ParagraphStyle(
        "Cell",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#1E293B"),
    )

    cell_bold_style = ParagraphStyle(
        "CellBold",
        parent=cell_style,
        fontName="Helvetica-Bold",
        textColor=colors.HexColor("#0B1F3A"),
    )

    story = []

    # Header banner table
    header_data = [
        [
            Paragraph("<b>SAHUKAR SHIELD</b> | CYBERCRIME & FRAUD REPORT", title_style),
            Paragraph(f"<b>Date:</b> {datetime.now().strftime('%d %b %Y')}<br/><b>Status:</b> READY TO FILE", cell_style)
        ]
    ]
    t_header = Table(header_data, colWidths=[360, 172])
    t_header.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_header)

    story.append(Paragraph("FORMAL COMPLAINT: ILLEGAL DIGITAL LENDING & HARASSMENT", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor("#0B1F3A"), spaceBefore=4, spaceAfter=8))

    # Complainant and App Details Grid
    c_name = sanitize_for_pdf(complainant.get("name") or "Citizen Complainant [Confidential]")
    c_state = sanitize_for_pdf(complainant.get("state") or "India")
    c_phone = sanitize_for_pdf(complainant.get("phone") or "Provided in Portal")

    app_name = sanitize_for_pdf(loan.get("app_name") or "Unverified Lending App")
    lender = sanitize_for_pdf(loan.get("lender_name") or "Unregistered Entity")
    disbursed = sanitize_for_pdf(f"Rs. {loan.get('disbursed_amount', 0):,.2f}" if loan.get('disbursed_amount') else "N/A")
    repayment = sanitize_for_pdf(f"Rs. {loan.get('repayment_demanded', 0):,.2f}" if loan.get('repayment_demanded') else "N/A")

    details_data = [
        [Paragraph("<b>COMPLAINANT DETAILS</b>", cell_bold_style), Paragraph("<b>LOAN & APPLICATION DETAILS</b>", cell_bold_style)],
        [Paragraph(f"<b>Name:</b> {c_name}<br/><b>State:</b> {c_state}<br/><b>Phone:</b> {c_phone}", cell_style),
         Paragraph(f"<b>App Name:</b> {app_name}<br/><b>Lender:</b> {lender}<br/><b>Disbursed:</b> {disbursed} | <b>Demanded:</b> {repayment}", cell_style)]
    ]
    t_details = Table(details_data, colWidths=[266, 266])
    t_details.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#F1F5F9")),
        ('BACKGROUND', (0,1), (-1,1), colors.HexColor("#F8FAFC")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_details)
    story.append(Spacer(1, 8))

    # Chronological Incident Timeline Table
    story.append(Paragraph("1. CHRONOLOGY OF HARASSMENT & INTIMIDATION EVENTS", h2_style))
    timeline_rows = [
        [Paragraph("<b>Date / Time</b>", cell_bold_style), Paragraph("<b>Channel</b>", cell_bold_style), Paragraph("<b>Event Summary & Threat Details</b>", cell_bold_style), Paragraph("<b>Proof ID</b>", cell_bold_style)]
    ]
    if timeline:
        for idx, item in enumerate(timeline, 1):
            dt = sanitize_for_pdf(item.get("date", "N/A"))
            tm = sanitize_for_pdf(item.get("time", ""))
            dt_tm = f"{dt}<br/>{tm}" if tm else dt
            chan = sanitize_for_pdf(item.get("channel", "Call/SMS"))
            summ = sanitize_for_pdf(item.get("summary", ""))
            ev_f = sanitize_for_pdf(item.get("evidence_file", f"Item #{idx}"))
            timeline_rows.append([
                Paragraph(dt_tm, cell_style),
                Paragraph(chan, cell_style),
                Paragraph(summ, cell_style),
                Paragraph(ev_f, cell_style),
            ])
    else:
        timeline_rows.append([
            Paragraph("Ongoing", cell_style),
            Paragraph("WhatsApp / Calls", cell_style),
            Paragraph("Continuous automated and agent threats sent to borrower and contacts demanding immediate payment under duress.", cell_style),
            Paragraph("Chat Logs", cell_style),
        ])

    t_timeline = Table(timeline_rows, colWidths=[80, 80, 302, 70])
    t_timeline.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#E2E8F0")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#94A3B8")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t_timeline)
    story.append(Spacer(1, 8))

    # Evidence Checklist
    story.append(Paragraph("2. PRESERVED DIGITAL EVIDENCE ATTACHED", h2_style))
    ev_items = evidence if evidence else [
        "Full screenshots of threatening messages with visible sender numbers and timestamps",
        "Bank transaction statement proving disbursal deductions and recipient account",
        "Audio call recordings of abusive language and extortion threats",
        "App permissions log showing unauthorized scraping of contact list"
    ]
    ev_table_data = []
    for ev in ev_items:
        ev_table_data.append([
            Paragraph("[ X ]", cell_bold_style),
            Paragraph(sanitize_for_pdf(ev), cell_style)
        ])
    t_ev = Table(ev_table_data, colWidths=[24, 508])
    t_ev.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(t_ev)
    story.append(Spacer(1, 8))

    # Relief & Legal Sections
    story.append(Paragraph("3. RELIEF REQUESTED & STATUTORY PROVISIONS", h2_style))
    relief_text = (
        "Complainant requests registration of this complaint and prompt action against the illegal operators: "
        "(1) Interdiction and freezing of associated mule UPI IDs and bank accounts; "
        "(2) Notice to mobile service providers to trace and block virtual numbers used for extortion; "
        "(3) Criminal investigation for extortion, defamation, and intimidation under the Bharatiya Nyaya Sanhita (BNS) "
        "and Section 66E / 67 of the Information Technology Act. "
        "All statutory provisions are subject to determination by the investigating cybercrime authorities."
    )
    story.append(Paragraph(sanitize_for_pdf(relief_text), body_style))
    story.append(Spacer(1, 10))

    # Declaration and Signature
    declaration_block = [
        Paragraph("<b>DECLARATION & VERIFICATION</b>", bold_body_style),
        Paragraph(
            "I verify that the statements made above are true to the best of my knowledge and that all evidence presented "
            "has been truthfully gathered from my mobile device without modification.",
            body_style
        ),
        Spacer(1, 20),
        Table([
            [
                Paragraph("<b>Date:</b> " + datetime.now().strftime("%d-%m-%Y"), cell_style),
                Paragraph("<b>Complainant Signature:</b> _______________________", cell_style)
            ]
        ], colWidths=[200, 332])
    ]
    story.append(KeepTogether(declaration_block))

    # Build PDF with NumberedCanvas
    doc.build(story, canvasmaker=NumberedCanvas)
    buffer.seek(0)
    pdf_bytes = buffer.getvalue()
    PDF_STORAGE[pdf_id] = pdf_bytes
    return pdf_id

def get_pdf_bytes(pdf_id: str) -> bytes | None:
    return PDF_STORAGE.get(pdf_id)
