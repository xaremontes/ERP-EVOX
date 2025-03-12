import {React} from 'react'; 
import './Dashboard.css'
import Clientes from './Kpi/Clientes/Clientes';
import Contabilidad from './Kpi/Contabilidad/Contabilidad';
import RecursosHumanos from './Kpi/RecursosHumanos/RecursosHumanos';
import Inventario from './Kpi/Inventario/Inventario';
export default function Dashboard() {
    return (
        <>
        <h3>Dashboard</h3>
        <div className="container">
            <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
            <Clientes/>
            </div>  
            <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
            <Contabilidad/>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
            <RecursosHumanos/>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
            <Inventario/>
            </div>
            </div>
        </div>
        </>
    )
}