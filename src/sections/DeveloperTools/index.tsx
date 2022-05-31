import React, { useState }  from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import allActions from '../../actions';
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

import './index.scss';

export interface DeveloperToolsProps {
    onRenderPage? : (page? : JSX.Element) => void;
    loadingPage   : JSX.Element
}

function DeveloperTools(props: DeveloperToolsProps) {

    const { onRenderPage, loadingPage } = props;

	const { t } = useTranslation();
    const dispatch = useDispatch();

    function TriggerErrorMessage() {

        const [ errorType, setErrorType ] = useState<number>(500);
        const [ errorMsg , setErrorMsg  ] = useState<string>("");

        const triggerErrorMsg = () => {
            dispatch(allActions.apiExec.setApiStatus({
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

        const showLoadingPage = () => {
            const toShow = !show;
            setShow(toShow);

            if(toShow) {
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

    const cheatCodedSequence: CheatCodeRevealingProps = {
        sequence    : [ "Digit1", "Digit3" ],
        specialKeys : [ SpecialKey.Alt, SpecialKey.Control ]
    }

    return (
        <Panel icon={<IconBug/>} className="dev-tools" closable title={t("dev-tools.title")} cheatCoded={cheatCodedSequence} >
            <TriggerErrorMessage/>
            <ShowLoadingPage />
        </Panel>
    )
}

export default DeveloperTools;