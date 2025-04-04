import { useEffect, useState } from "react";
import { RecipeSummary } from "../model/RecipeSummary";
import { getRecipeSummaryService } from "../service/GetRecipeSummaryService"
import { AiOutlineClose } from "react-icons/ai";
import  styles from "../pages/css/RecipesPage.module.css";

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
                    </div>
                </div>
            </div>
        </>
    );
}

export default RecipeModal;