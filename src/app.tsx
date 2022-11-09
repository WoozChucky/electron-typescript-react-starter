import { createRoot } from "react-dom/client";
import { Layout } from "./components/Layout";
import { Home } from "./components/views/Home";

const container = document.getElementById('root');

const root = createRoot(container);

function main() {
    root.render(
        <Layout>
            <Home />
        </Layout>
    );
}

main();