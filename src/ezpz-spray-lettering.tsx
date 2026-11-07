"use client";

import { useEffect, useState, type CSSProperties } from "react";

// MIT. Paint masks and lettering are original EZPZ artwork.
// Concrete source: ambientCG Concrete040 (CC0). Self-host these files if preferred.
const ASSET_ROOT = "https://raw.githubusercontent.com/ezam0000/ezpz-spray-lettering/276fc75dc8a69c80a07fbdae3e6541a79e571e32/public/assets";
const ASSETS = {
  lettering: `${ASSET_ROOT}/lettering.png`,
  overspray: `${ASSET_ROOT}/overspray.png`,
  drips: `${ASSET_ROOT}/drips.png`,
  concrete: `${ASSET_ROOT}/concrete.jpg`,
  poster: `${ASSET_ROOT}/poster.jpg`,
};

export interface EZPZSprayLetteringProps {
  /** Accessible description. This does not alter the drawn lettering. */
  label?: string;
  paintColor?: string;
  backgroundColor?: string;
  /** Set to zero for a plain background. */
  textureAmount?: number;
  oversprayAmount?: number;
  dripAmount?: number;
  /** Replace with transparent, aligned masks to use your own lettering. */
  letteringMaskUrl?: string;
  oversprayMaskUrl?: string;
  dripMaskUrl?: string;
  textureUrl?: string;
  /** Static fallback shown during loading or if mask files fail. */
  posterUrl?: string;
  className?: string;
  style?: CSSProperties;
}
const fill: CSSProperties = { position: "absolute", inset: 0 };
const clamp = (value: number) => Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 1;
function maskStyle(url: string, color: string, opacity = 1): CSSProperties {
  const image = `url(${JSON.stringify(url)})`;
  return { ...fill, backgroundColor: color, opacity: clamp(opacity),
    maskImage: image, WebkitMaskImage: image, maskSize: "100% 100%", WebkitMaskSize: "100% 100%",
    maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat", maskMode: "alpha" };
}

/** Layered native artwork; no animation loop, font download, or canvas dependency. */
export function EZPZSprayLettering({
  label = "EZPZ spray-paint lettering", paintColor = "#f2f0e8", backgroundColor = "#171717",
  textureAmount = 1, oversprayAmount = 1, dripAmount = 1,
  letteringMaskUrl = ASSETS.lettering, oversprayMaskUrl = ASSETS.overspray,
  dripMaskUrl = ASSETS.drips, textureUrl = ASSETS.concrete, posterUrl = ASSETS.poster,
  className, style,
}: EZPZSprayLetteringProps) {
  const key = [letteringMaskUrl, oversprayMaskUrl, dripMaskUrl, textureUrl].join("\n");
  const [loadedKey, setLoadedKey] = useState("");
  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = [];
    Promise.all([letteringMaskUrl, oversprayMaskUrl, dripMaskUrl, textureUrl].map(src => new Promise<void>((resolve, reject) => {
      const image = new Image(); images.push(image);
      image.onload = () => resolve(); image.onerror = () => reject(new Error("Artwork asset unavailable"));
      image.src = src;
    }))).then(() => { if (!cancelled) setLoadedKey(key); }).catch(() => { /* Keep the supplied static poster. */ });
    return () => { cancelled = true; images.forEach(image => { image.onload = null; image.onerror = null; }); };
  }, [key, letteringMaskUrl, oversprayMaskUrl, dripMaskUrl, textureUrl]);
  const ready = loadedKey === key;
  return (
    <div role="img" aria-label={label} className={className}
      style={{ position: "relative", width: "100%", aspectRatio: "20 / 13", overflow: "hidden", backgroundColor, ...style }}>
      {!ready ? <img src={posterUrl} alt="" aria-hidden="true" decoding="async"
        style={{ ...fill, width: "100%", height: "100%", objectFit: "cover" }} /> : null}
      {ready ? <div aria-hidden="true" style={fill}>
        <img src={textureUrl} alt="" draggable={false} style={{ ...fill, width: "100%", height: "100%", objectFit: "fill", opacity: clamp(textureAmount) }} />
        <div style={maskStyle(letteringMaskUrl, paintColor)} />
        <div style={maskStyle(oversprayMaskUrl, paintColor, oversprayAmount)} />
        <div style={maskStyle(dripMaskUrl, paintColor, dripAmount)} />
      </div> : null}
    </div>
  );
}
export default EZPZSprayLettering;
