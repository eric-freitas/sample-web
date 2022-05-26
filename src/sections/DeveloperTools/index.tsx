import React, { useState }  from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import allActions from '../../actions';
import Button from '../../components/Button';
import { CheatCodeRevealingProps } from '../../components/CheatCodeRevealing';
import Dropdown from '../../components/DropDown';
import IconBug from '../../components/Icons/Bug';
import Panel, { PanelType } from '../../components/Panel';
import { ApiExecStatus } from '../../models/ApiExec';
import { SpecialKey } from '../../static/sniffKey';

import './index.scss';


function DeveloperTools() {

	const { t } = useTranslation();
    const dispatch = useDispatch();

    function TriggerErrorMessage() {

        const [ errorType, setErrorType ] = useState<number>(0);

        const triggerErrorMsg = () => {
            dispatch(allActions.apiExec.setStatus({
                api : "dev-tools",
                status: ApiExecStatus.Error,
                error : {
                    response : {
                        status: errorType,
                        data : {
                            msg: "Jest not found"
                        }   
                    }
                }
            }));
        }
        
        return  (
            <Panel className='dev-tools__trigger-error' type={PanelType.Box} title={t("dev-tools.trigger-error.title")}>
                <form name="trigger-error">

                    <Dropdown value={errorType} id="te__error-type" label={t("dev-tools.trigger-error.type")} onSelected={v => setErrorType(v as number)}>
                        {[200, 400, 500]}
                    </Dropdown>

                    <fieldset name="buttons" className='align-center'>
                        <Button text={t("dev-tools.trigger-error.button")} onClick={triggerErrorMsg} />
                    </fieldset>
                </form>
            </Panel>
        );
    }


   
    const cheatCodedSequence: CheatCodeRevealingProps = {
        sequence    : [ "Digit1", "Digit3" ],
        specialKeys : [ SpecialKey.Alt, SpecialKey.Control ]
    }

    return (
        <Panel icon={<IconBug/>} className="dev-tools" closable title={t("dev-tools.title")} cheatCoded={cheatCodedSequence} >
            
            <TriggerErrorMessage/>
           
        </Panel>
    )
}

export default DeveloperTools;