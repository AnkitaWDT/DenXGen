import { PDFDocument, rgb } from 'react-native-pdf-lib';

const generatePdf = async (profileData) => {
    const pdf = await PDFDocument.create();

    const page = pdf.addPage([250, 400]);

    page.drawText('Professional Profile', {
        x: 5,
        y: 375,
        color: rgb(0, 0, 0),
    });

    // Add profile data to the PDF
    page.drawText(`Name: ${profileData.name}`, {
        x: 5,
        y: 350,
        color: rgb(0, 0, 0),
    });
    // Add more profile data as needed...

    // Save the PDF to a temporary file
    const pdfPath = `${RNFS.DocumentDirectoryPath}/profile.pdf`;
    await pdf.write(pdfPath);

    return pdfPath;
};

export default generatePdf;
