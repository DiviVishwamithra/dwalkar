import ExampleCard from "./ExampleCard";

const EXAMPLES = [
    "Create an Expense Tracker",
    "Build a Netflix Clone",
    "Create a Food Delivery App",
    "Build a CRM Dashboard",
    "Create a Portfolio Website",
    "Create a Hospital Management System",
];

export default function Examples({
    onSelect,
}) {
    return (
        <section className="mt-12">
            <h3 className="mb-6 text-xl font-semibold text-white">
                Example Projects
            </h3>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {EXAMPLES.map((example) => (
                    <ExampleCard
                        key={example}
                        title={example}
                        onClick={onSelect}
                    />
                ))}
            </div>
        </section>
    );
}