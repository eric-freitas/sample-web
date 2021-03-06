import React, { useState }  from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import { CheatCodeRevealingProps } from '../../components/CheatCodeRevealing';
import IconButton from '../../components/IconButton';
import IconBug from '../../components/Icons/Bug';
import IconShow from '../../components/Icons/Show';
import NumericInput from '../../components/NumericInput';
import Panel, { PanelType } from '../../components/Panel';
import TextInput from '../../components/TextInput';
import { ApiExecStatus } from '../../models/ApiExec';
import { SpecialKey } from '../../static/sniffKey';
import Icons from '../../components/Icons';
import Emojis from '../../components/Icons/Emojis';

import './index.scss';
import { camelCaseToWords, renderIcons } from '../../static/utils';
import IconSlash from '../../components/Icons/Slash';
import IconRotate from '../../components/Icons/Rotate';
import appDataManager from '../../static/appDataManager';

export interface DeveloperToolsProps {
    onRenderPage? : (page? : JSX.Element) => void
}

function DeveloperTools(props: DeveloperToolsProps) {
    const { onRenderPage } = props;
    const { t            } = useTranslation();
    const   dispatch       = useDispatch();

    const appProps = appDataManager.get();
    const { loadingPage, actions } = appProps ?? {};
    const appActions = actions ?? {};

    function TriggerErrorMessage() {
        const [ errorType, setErrorType ] = useState<number>(500);
        const [ errorMsg , setErrorMsg  ] = useState<string>("");

        const triggerErrorMsg = async() => {
            dispatch(appActions.apiExec?.setApiStatus({
                api : "dev-tools",
                status: ApiExecStatus.Error,
                error : {
                    response : {
                        status: errorType,
                        data : {
                            msg: errorMsg
                        }   
                    }
                }
            }));
            setTimeout(()=> {
                dispatch(appActions.apiExec?.setApiStatus({
                    api : "dev-tools",
                    status: ApiExecStatus.Ok
                }));
            }, 10200);
        }
        
        return  (
            <Panel className='dev-tools__trigger-error' type={PanelType.Box} title={t("dev-tools.trigger-error.title")}>
                <form name="trigger-error">
                    <NumericInput value={errorType} id="te__error-type" label={t("dev-tools.trigger-error.type")} onChange={v => setErrorType(v ?? 500)}/>
                    <TextInput id="te__error-msg" text={errorMsg} label={t("dev-tools.trigger-error.msg")} onChange={v => setErrorMsg(v)} />
                    <div className='align-center button-field'>
                        <Button text={t("dev-tools.trigger-error.button")} onClick={triggerErrorMsg} />
                    </div>
                </form>
            </Panel>
        );
    }
   
    function ShowLoadingPage() {
        const [ show, setShow ] = useState<boolean>(false);
        const showLoadingPage   = () => {
            const toShow = !show;
            setShow(toShow);
            if(toShow && loadingPage) {
                onRenderPage?.call(null, loadingPage)
            } else {
                onRenderPage?.call(null);
            }
        }
        return (
            <Panel className='dev-tools__show-load-page' type={PanelType.Box} title={t("dev-tools.show-load-page.title")}>
                <div className='align-center button-field'>
                    <IconButton icon={<IconShow slashed={show}/>} onClick={showLoadingPage} />
                </div>
            </Panel>
        )
    }

    function ShowApiLoadingState () {
        const [ show, setShow ] = useState<boolean>(false);
        const showApiState      = () => {
            const toShow = !show;
            setShow(toShow);
            if (toShow) {
                dispatch(appActions.apiExec?.setApiStatus({
                    api : "api-loading-state",
                    status: ApiExecStatus.Init
                }));
            } else {
                dispatch(appActions.apiExec?.setApiStatus({
                    api : "api-loading-state",
                    status: ApiExecStatus.Ok
                }));
            }
        }

        return  (
            <Panel className='dev-tools__show-api-state' type={PanelType.Box} title={t("dev-tools.show-api-state.title")}>
                <div className='align-center button-field'>
                    <IconButton icon={<IconShow slashed={show}/>} onClick={showApiState} />
                </div>
            </Panel>
        )
    }

    function DisplayIcons() {
        const [ slashed, setSlashed ] = useState<boolean>(false);
        const [ rotate , setRotate  ] = useState<number >(0);

        interface DisplayIconProps {
            name     : string,
            children : JSX.Element
        }

        function DisplayIcon(props: DisplayIconProps) {
            const { name, children: icon } = props;
            return ( 
                <li className='display-icon'>
                    <span className='icon-name'>{name}</span>
                    {icon}
                </li>
            )
        }

        const renderIcon = (name: string, icon: JSX.Element) => {
            return <DisplayIcon key={name} name={camelCaseToWords(name)}>{icon}</DisplayIcon>
        }

        const doRotate = () => {
            let newRotate = rotate + 45;
            if (newRotate >= 360) {
                newRotate = 0;
            }
            setRotate(newRotate);
        }

        return  (
            <Panel className='dev-tools__display-icons' type={PanelType.Box} title={t("dev-tools.display-icons.title")}>
                <nav>
                    <IconButton borderless hint={t("dev-tools.display-icons.slash") } icon={<IconSlash/>} activated={slashed} onClick={() => setSlashed(!slashed)}/>
                    <IconButton borderless hint={t("dev-tools.display-icons.rotate")} icon={<IconRotate   activated={rotate !== 0} rotate={rotate}/>} onClick={doRotate}/>
                </nav>
                <ul>
                    {renderIcons(Icons,  { slashed, doNotAnimate : true, rotate }, renderIcon)}
                    {renderIcons(Emojis, { slashed, doNotAnimate : true, rotate }, renderIcon)}
                </ul>
            </Panel>
        )
    }

    const cheatCodedSequence: CheatCodeRevealingProps = {
        sequence    : [ "Digit1", "Digit3" ],
        specialKeys : [ SpecialKey.Alt, SpecialKey.Control ]
    }

    return (
        <Panel icon={<IconBug/>} className="dev-tools" visible={false} closable title={t("dev-tools.title")} cheatCoded={cheatCodedSequence} >
            <TriggerErrorMessage/>
            <ShowLoadingPage />
            <ShowApiLoadingState/>
            <DisplayIcons/>
        </Panel>
    )
}

export default DeveloperTools;