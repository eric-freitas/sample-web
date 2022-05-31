import { IconRenderer } from "../../../static/utils";
import { BaseIconProps } from "../Icon/BaseIcon";
import Tired from "./Tired";

export { Tired };

const emojis: IconRenderer = {
    tired: (props?: BaseIconProps) => <Tired {...props} />
}

export default emojis;