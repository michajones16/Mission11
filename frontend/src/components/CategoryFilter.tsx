import { useEffect, useState } from "react";

function CategoryFilter({
    selectedCategories, setSelectedCategories
}: {
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
}) {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`https://mission13-michael-jones-f6gdeddbgxbabyaf.eastus-01.azurewebsites.net/Book/GetBookTypes`);
                const data = await response.json();
                console.log("Fetched categories:", data);
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }
        fetchCategories();
    }, []);

    function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
        const updatedCategories = selectedCategories.includes(target.value)
            ? selectedCategories.filter((category) => category !== target.value)
            : [...selectedCategories, target.value];
        setSelectedCategories(updatedCategories);
    }

    return (
        <div>
            <h5>Book Categories</h5>
            <div className="card ms-3">
                {categories.map((category, index) => (
                    <div className="text-start" key={index}>
                        <input
                            type="checkbox"
                            value={category}
                            onChange={handleCheckboxChange}
                        />
                        <label className="ms-2" htmlFor={category}>{category}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter;