/* Creamos el servicio para empleados en: en:\proy_xal\services\empleados.js */
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    'SELECT id_empleado,first_name,last_name,company_name,address,city,state,zip,phone1,phone2,email,department FROM empleado OFFSET $1 LIMIT $2', 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

function validateCreate(empleado) {
  let messages = [];

  console.log(empleado);

  if (!empleado) {
    messages.push('No se proporciona ningún objeto');
  }

  if (!empleado.first_name) {
    messages.push('El campo de first_name esta vacio');
  }

  if (empleado.state && empleado.state.length != 2) {
    messages.push('El state solo puede tener 2 caracteres');
  }

  const regstate = /^[A-Z ]*$/;
  if (!regstate.test(empleado.state)) {
        messages.push('El state solo debe tener caracteres de la A - Z mayusculas');
    }

  if (messages.length) {
    let error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
}

function validateDelete(id_empleado) {
  let messages = [];

  console.log(id_empleado);

  if (!id_empleado) {
    messages.push('No se proporciona ningún id_empleado');
  }

  const regId = /^[0-9 ]*$/;
  if (!regId.test(id_empleado)) {
    messages.push('El valor de Id_empleado solo debe tener numeros del 0 - 9 ');
  }  

  if (messages.length) {
    let error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
}

async function create(empleado){
  validateCreate(empleado);

/* Ejemplo: INSERT INTO empleado (first_name,last_name,company_name,address,city,state,zip,phone1,phone2,email,department)
VALUES('James','Butt','Benton, John B Jr','6649 N Blue Gum St','New Orleans','LA','70116','504-621-8927','504-845-1427','jbutt@gmail.com','Sales')
*/
  const result = await db.query(
    'INSERT INTO empleado (first_name,last_name,company_name,address,city,state,zip,phone1,phone2,email,department) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *',
    [empleado.first_name,empleado.last_name,empleado.company_name,empleado.address,empleado.city,empleado.state,empleado.zip,empleado.phone1,empleado.phone2,empleado.email,empleado.department]
  );
  let message = 'Error al crear empleado';

  if (result.length) {
    message = 'Empleado creado con exito';
  }

  return {message};
}

async function obtenerPorId(id_empleado) {
	
const result = await db.query("select * from empleado where id_empleado = $1", [id_empleado]);
      return result[0];
	  let message = 'Error al consultar result[0] por id_empleado';

  if (result.length) {
    message = 'Consulta de id_empleado con exito';
  }

  return {message};
}

async function eliminar(id_empleado) {
    validateDelete(id_empleado); 
    
	const result = await db.query(`select count(b.id_empleado) as cuenta 
    from empleado b where b.id_empleado = $1`, [id_empleado]);
 
    const tcuenta = result[0].cuenta;
    let message = 'Valor de salida qry='+ tcuenta +' prueba ';

    if ( tcuenta == 1 ) {
    const resultd = db.query(`delete from empleado a
	where a.id_empleado = $1`, [id_empleado]);
    const txrow = JSON.stringify(resultd);
    message = 'Empleado eliminado con exito '+ txrow;
    }else if (tcuenta != 1 ) {
    message = 'No existe registro para eliminar';
    }
  return {message};
}

module.exports = {
  getMultiple,
  create,
  obtenerPorId,
  eliminar
}

