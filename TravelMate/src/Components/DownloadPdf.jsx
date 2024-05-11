import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const DownloadPdf = () => {
  const handleDownload = () => {
    const input = document.getElementById("booking-info");
    html2canvas(input, { scale: 4 }).then((canvas) => { 
      const imgData = canvas.toDataURL("image/jpeg", 1.0); 
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth - 20; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width; 
      let positionY = 0;
      const imgRatio = imgHeight / pdfHeight;
      if (imgRatio > 1) {
        positionY = (pdfHeight - imgHeight) / 2;
      }
      pdf.addImage(imgData, "JPEG", 10, positionY, imgWidth, imgHeight);
  
      // Add the provided text to the PDF
      pdf.setFontSize(12);
      pdf.text("Thank you for booking with TravelMate,", 10, imgHeight + positionY + 10);
      pdf.text("By accessing or using TravelMate in any manner, you agree to be bound by these Terms and Conditions.", 10, imgHeight + positionY + 15);

      const termsAndConditions = [
        "1. All bookings made through TravelMate are subject to availability.",
        "2. Users must provide accurate and complete information during the booking process.",
        "3. Booking confirmation will be sent via email upon successful transaction completion.",
        "4. Payment for bookings must be made in full at the time of reservation.",
        "5. Prices displayed on TravelMate are inclusive of taxes and fees unless otherwise stated.",
        "6. Extra amount will be charged if the customer damages the assets.",
        "7. Extra amount will be charged if any unavoidable event occurs (Example: Flood, landslides e.t.c).",
        "8. Cancellation policies vary depending on the service provider and the type of booking.",
        "9. Refunds, if applicable, will be processed according to the cancellation policy of the service provider.",
        "10. Users are responsible for maintaining the confidentiality of their account credentials.",
        "11. Users must not engage in any unlawful or unauthorized activities on TravelMate.",
        "12. Any misuse of the platform may result in account termination.",
        "13. TravelMate strives to provide accurate information, but we do not guarantee the completeness or reliability of the content.",
        "14. TravelMate reserves the right to cancel or modify any booking without prior notice.",
        "15. TravelMate is not responsible for any lost or stolen items."
      ];

    
  
      pdf.setFont("helvetica");
      pdf.setFontSize(10);
      let yOffset = imgHeight + positionY + 25; // Initial Y offset for terms and conditions text
      termsAndConditions.forEach((term, index) => {
        const lineHeight = pdf.getTextDimensions(term).h * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
        if (yOffset + lineHeight > pdfHeight - 5) {
          pdf.addPage();
          yOffset = 10;
        }
        pdf.text(term, 10, yOffset);
        yOffset += lineHeight; // Increment Y offset for the next line
      });
  
      pdf.save("TravelMate_BookingInformation.pdf");
    });
  };
  

  return (
    <div className="py-9 font-semibold grid">
      Download your booking information:
      <button
        className="mt-6 w-64 h-16 bg-primary text-white hover:bg-green-500 rounded-3xl"
        onClick={handleDownload}
      >
        Download pdf
      </button>
    </div>
  );
};

export default DownloadPdf;