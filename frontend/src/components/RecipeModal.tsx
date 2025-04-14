import { useEffect, useState } from "react";
import { RecipeSummary } from "../model/RecipeSummary";
import { getRecipeSummaryService } from "../service/GetRecipeSummaryService"
import { AiOutlineClose, AiOutlineFilePdf } from "react-icons/ai";
import  styles from "../pages/css/RecipesPage.module.css";
import jsPDF from "jspdf";

interface Props {
    recipeId: string;
    onClose: () => void;
}

function RecipeModal({ recipeId, onClose }: Props) {

    const [recipeSummary, setRecipeSummary] = useState<RecipeSummary>();

    useEffect(() => {
        const fetchRecipeSummary = async () => {
            try {
                const summaryRecipe = await getRecipeSummaryService(recipeId);
                setRecipeSummary(summaryRecipe);
            } catch (error) {
                console.log(error);
            }
        }
        fetchRecipeSummary();
    }, [recipeId]);

    const exportToPdf = () => {
        if (!recipeSummary) {
            return;
        }
    
        const pdfDocument = new jsPDF();
    
        const pageWidth = pdfDocument.internal.pageSize.getWidth();
        const pageHeight = pdfDocument.internal.pageSize.getHeight();
        const margin = 10;
        const textWidth = pageWidth - margin * 2;
    
        pdfDocument.setFontSize(24);
        pdfDocument.setTextColor("#007bff");
        pdfDocument.text(recipeSummary.title, pageWidth / 2, 20, { align: "center" });
    
        pdfDocument.setDrawColor(0, 123, 255);
        pdfDocument.setLineWidth(1);
        pdfDocument.line(margin, 25, pageWidth - margin, 25);
    
        pdfDocument.setFontSize(12);
        pdfDocument.setTextColor("#000");
        const wrappedText = pdfDocument.splitTextToSize(
            recipeSummary.summary.replace(/<[^>]+>/g, ""),
            textWidth
        );
        pdfDocument.text(wrappedText, margin, 35);
    
        pdfDocument.setFontSize(10);
        pdfDocument.setTextColor("#888");
        pdfDocument.text(
            `Generated by App Recipe TastyPick - ${new Date().toLocaleDateString()}`,
            pageWidth / 2,
            pageHeight - 10,
            { align: "center" }
        );
    
        pdfDocument.save(`${recipeSummary.title}.pdf`);
    };

    if (!recipeSummary) {
        return <></>;
    }

    return (
        <>
            <div className={styles.overlay}>
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h2>{recipeSummary?.title}</h2>
                            <span className={styles.closeBtn} onClick={onClose}><AiOutlineClose /></span>
                        </div>
                        <p dangerouslySetInnerHTML={{ __html: recipeSummary?.summary }}></p>
                        <button onClick={exportToPdf} className={styles.exportBtn} title="Export to PDF">
                            <AiOutlineFilePdf />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RecipeModal;