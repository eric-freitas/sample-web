import { IconRenderer } from "../../static/utils";
import Bug from "./Bug";
import Chevron from "./Chevron";
import Close from "./Close";
import Conflict from "./Conflict";
import Edit from "./Edit";
import * as Emoji from './Emojis';
import { BaseIconProps } from "./Icon/BaseIcon";
import Key from "./Key";
import Legal from "./Legal";
import Loading from "./Loading";
import Money from "./Money";
import NotFound from "./NotFound";
import PermissionDenied from "./PermissionDenied";
import Required from "./Required";
import Running from "./Running";
import Server from "./Server";
import Show from "./Show";
import Timeout from "./Timeout";
import Slash from "./Slash";
import Search from './Search';
//import Unauthorized from "./Unauthorized";

export { Bug, Chevron, Close, Conflict, Edit, Emoji, Key, Legal, Loading, Money, NotFound, PermissionDenied, Required, Running, Server, Show, Timeout, Slash, /*Unauthorized*/}

const icons:IconRenderer = {
    bug              : (props?: BaseIconProps) => <Bug              {...props} />,
    chevron          : (props?: BaseIconProps) => <Chevron          {...props} />,
    close            : (props?: BaseIconProps) => <Close            {...props} />,
    conflict         : (props?: BaseIconProps) => <Conflict         {...props} />,
    edit             : (props?: BaseIconProps) => <Edit             {...props} />,
    key              : (props?: BaseIconProps) => <Key              {...props} />,
    legal            : (props?: BaseIconProps) => <Legal            {...props} />,
    loading          : (props?: BaseIconProps) => <Loading          {...props} />,
    money            : (props?: BaseIconProps) => <Money            {...props} />,
    notFound         : (props?: BaseIconProps) => <NotFound         {...props} />,
    permissionDenied : (props?: BaseIconProps) => <PermissionDenied {...props} />,
    required         : (props?: BaseIconProps) => <Required         {...props} />,
    running          : (props?: BaseIconProps) => <Running          {...props} />,
    server           : (props?: BaseIconProps) => <Server           {...props} />,
    show             : (props?: BaseIconProps) => <Show             {...props} />,
    timeout          : (props?: BaseIconProps) => <Timeout          {...props} />,
    slash            : (props?: BaseIconProps) => <Slash            {...props} />,
    search           : (props?: BaseIconProps) => <Search           {...props} />,
    //unauthorized     : () => <Unauthorized/>    ,
}

export default icons;
