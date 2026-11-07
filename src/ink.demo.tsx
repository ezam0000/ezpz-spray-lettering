import EZPZSprayLettering from "./ezpz-spray-lettering";
const settings = { paintColor: "#902920", backgroundColor: "#efe5d3", textureAmount: 0, oversprayAmount: 0.8, dripAmount: 1 };
export default function InkDemo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  return <main style={{ width: "100%", minHeight: "100svh", display: "grid", placeItems: "center", background: s.backgroundColor }}>
    <EZPZSprayLettering {...s} style={{ maxWidth: 1600 }} />
  </main>;
}
