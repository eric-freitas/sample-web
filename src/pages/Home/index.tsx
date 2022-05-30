import React  from 'react';
import Button from '../../components/Button';
import Panel from '../../components/Panel';
import IconBug from '../../components/Icons/Bug';

import './home.scss';
import Dropdown from '../../components/DropDown';
import IconTimeout from '../../components/Icons/Timeout';
import { FormFieldStatus } from '../../components/FormField';
import IconRunning from '../../components/Icons/Running';
import IconServer from '../../components/Icons/Server';
import TextInput from '../../components/TextInput';
import IconEdit from '../../components/Icons/Edit';
import IconLoading from '../../components/Icons/Loading';
import IconMoney from '../../components/Icons/Money';
import ProgressBar from '../../components/ProgressBar';

export default function Home(){

    return (
        <section className="page home">
            <h1>TESTE</h1>

            <div>
                <span>Data</span>

                <Button text="teste" />

                <Button className='borderless' text="X" />

            </div>

            <Panel closable title='Teste' icon={<IconBug />} >
                TESTE

                <ProgressBar time={10} />

                <form>
                    <Dropdown id="chiste" label="Chiste">
                    { ["A", "B", "C", "D"] }
                    </Dropdown>

                    <Dropdown id="dis-dd" value="Dois" label="Desabilitado" status={FormFieldStatus.Disabled}>
                            { ["Um", "Dois", "Três"] }
                    </Dropdown>

                    <Dropdown 
                        leadingIcon={<IconTimeout/>}
                        id="con-icone"  label="Com Ícone" >
                            { ["Este", "Ou Aquele"] }
                    </Dropdown>

                    <Dropdown 
                        leadingIcon={<IconRunning/>}
                        prefix="Prefixo"
                        suffix="Sufixo"
                        id="con-tudo"  label="Com um monte de tranqueira" >
                            { ["Este", "Ou Aquele", "Ou Mais Esse"] }
                    </Dropdown>
                    
                    <Dropdown id="dis-dd2" value="Dois" label="Com mais uma ajuda" helperText='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'>
                            { ["Um", "Dois", "Três", "Quatro"] }
                    </Dropdown>

                    <Dropdown 
                        leadingIcon={<IconServer slashed/>}
                        prefix="Prefixo"
                        suffix="Sufixo"
                        valid
                        id="valido"  label="Válido" >
                            {["Janeiro", "Fevereiro", "Março", "Abril"]}
                    </Dropdown>

                    <Dropdown 
                        leadingIcon={<IconServer slashed/>}
                        required
                        invalidText = "Selecione corretamente este DropDown"
                        helperText='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                        id="required"  label="Required" >
                            {["", "Maio", "Junho", "Julho", "Agosto"]}
                    </Dropdown>

                    <TextInput text="" label='Teste' trailingIcon={<IconEdit/>} prefix="Teste" suffix='kg' leadingIcon={<IconLoading/>} invalidText="Preencha corretamente" required />

                    <TextInput 
                        className="jest-input" label='jest'
                        fieldClassName='jest-field-class'
                        helperText='Jest Helper'
                        id='jest-id'
                        invalid
                        invalidText='Jest Invalid Text'
                        leadingIcon={<IconMoney/>}
                        prefix='Jest Prefix'
                        required
                        suffix='Jest Suffix'
                        text='Error Text'
                        trailingIcon={<IconMoney/>}
                    />
                </form>
            </Panel>

        </section>
    )
}

