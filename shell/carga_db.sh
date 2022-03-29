#Realiza la ingesta registro por registro de la data en Base de Datos Postgres
archivo="empleados.json"
cat $archivo|while read REG
do
  linea="${REG}"
curl -i -X POST -H 'Accept: application/json' -H 'Content-type: application/json' http://localhost:3000/empleados  --data "${linea}"
done 

