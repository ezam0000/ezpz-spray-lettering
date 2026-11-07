import { createRoot } from "react-dom/client";
import Demo from "./default.demo";
import InkDemo from "./ink.demo";
import EZPZSprayLettering from "./ezpz-spray-lettering";
const mode = new URLSearchParams(window.location.search).get("mode");
const view = mode === "ink" ? <InkDemo /> : mode === "dry" ? <Demo dripAmount={0} oversprayAmount={0} /> : mode === "fallback" ? <EZPZSprayLettering letteringMaskUrl="/missing-test-mask.png" /> : mode === "mobile" ? <div style={{width:390,maxWidth:"100%",margin:"auto"}}><EZPZSprayLettering /></div> : <Demo />;
createRoot(document.getElementById("root")!).render(view);
