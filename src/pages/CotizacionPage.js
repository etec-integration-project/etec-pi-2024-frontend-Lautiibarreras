import React, { useState } from 'react';

const CotizacionPage = () => {
    const [inputValues, setInputValues] = useState({
        cantidadProducto: 0,
        costoProducto: 0,
        margenGanancia: 0,
        otrosCostos: 0
    });
    
    const [resultado, setResultado] = useState(null);

    // Función para manejar cambios en los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues({
            ...inputValues,
            [name]: parseFloat(value) || 0
        });
    };

    // Función para calcular la cotización basada en el input del usuario
    const calcularCotizacion = (e) => {
        e.preventDefault();
        
        const { cantidadProducto, costoProducto, margenGanancia, otrosCostos } = inputValues;
        
        // Fórmulas basadas en el archivo Excel
        const costoTotalProducto = cantidadProducto * costoProducto;
        const ganancia = (margenGanancia / 100) * costoTotalProducto;
        const precioVenta = costoTotalProducto + ganancia + otrosCostos;

        setResultado({
            costoTotalProducto,
            ganancia,
            otrosCostos,
            precioVenta
        });
    };

    return (
        <div className="container">
            <h2>Cotización de Productos</h2>
            <form onSubmit={calcularCotizacion}>
                <div className="mb-3">
                    <label htmlFor="cantidadProducto" className="form-label">Cantidad de Producto</label>
                    <input
                        type="number"
                        className="form-control"
                        id="cantidadProducto"
                        name="cantidadProducto"
                        value={inputValues.cantidadProducto}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="costoProducto" className="form-label">Costo por Producto</label>
                    <input
                        type="number"
                        className="form-control"
                        id="costoProducto"
                        name="costoProducto"
                        value={inputValues.costoProducto}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="margenGanancia" className="form-label">Margen de Ganancia (%)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="margenGanancia"
                        name="margenGanancia"
                        value={inputValues.margenGanancia}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="otrosCostos" className="form-label">Otros Costos</label>
                    <input
                        type="number"
                        className="form-control"
                        id="otrosCostos"
                        name="otrosCostos"
                        value={inputValues.otrosCostos}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                
                <button type="submit" className="btn btn-primary">Calcular Cotización</button>
            </form>

            {/* Mostrar resultado */}
            {resultado && (
                <div className="mt-4">
                    <h3>Resultado de la Cotización</h3>
                    <ul className="list-group">
                        <li className="list-group-item">Costo Total del Producto: ${resultado.costoTotalProducto.toFixed(2)}</li>
                        <li className="list-group-item">Ganancia: ${resultado.ganancia.toFixed(2)}</li>
                        <li className="list-group-item">Otros Costos: ${resultado.otrosCostos.toFixed(2)}</li>
                        <li className="list-group-item"><strong>Precio de Venta Final: ${resultado.precioVenta.toFixed(2)}</strong></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CotizacionPage;
