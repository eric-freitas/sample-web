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

                <form>
                    <Dropdown id="chiste" label="Chiste">
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                    </Dropdown>

                    <Dropdown id="dis-dd" value="Dois" label="Desabilitado" status={FormFieldStatus.Disabled}>
                            { ["Um", "Dois", "Três"] }
                    </Dropdown>

                    <Dropdown 
                        leadingIcon={<IconTimeout/>}
                        id="con-icone"  label="Com Ícone" >
                            <option>Este</option>
                            <option>Ou Aquele</option>
                    </Dropdown>

                    <Dropdown 
                        leadingIcon={<IconRunning/>}
                        prefix="Prefixo"
                        suffix="Sufixo"
                        id="con-tudo"  label="Com um monte de tranqueira" >
                            <option>Este</option>
                            <option>Ou Aquele</option>
                            <option>Ou Mais Esse</option>
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
                </form>
            </Panel>

        </section>
    )
}
