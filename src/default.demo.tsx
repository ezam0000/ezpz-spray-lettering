import EZPZSprayLettering from "./ezpz-spray-lettering";
const settings = { paintColor: "#f2f0e8", backgroundColor: "#171717", textureAmount: 1, oversprayAmount: 1, dripAmount: 1 };
export default function Demo(props: Partial<typeof settings>) {
  return <main style={{ width: "100%", minHeight: "100svh", display: "grid", placeItems: "center", background: "#171717" }}>
    <EZPZSprayLettering {...settings} {...props} style={{ maxWidth: 1600 }} />
  </main>;
}
