import type { CSSProperties } from "react";
import type { Theme } from "../lib/types";

const useBackgroundStyle = (
  theme?: Theme,
  thumbnail: boolean = false
): CSSProperties | null =>
  theme?.background
    ? {
        width: "100%",
        backgroundColor: theme.background.color,
        backgroundImage: theme.background.image,
        backgroundSize: theme.background.size,
        backgroundRepeat: theme.background.repeat,
        ...(thumbnail
          ? {
              height: "130px",
            }
          : {
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: -1,
            }),
      }
    : null;

export default useBackgroundStyle;
