#formate las lineas del archivo de entrada en formato JSON para poder ingesta a BD postgres
#COLUMNAS="first_name last_name company_name address city state zip phone1 phone2 email department"
  
cat Sample.txt|awk -F"|" '{ printf("{\"first_name\":\"%s\",\"last_name\":\"%s\",\"company_name\":\"%s\",\"address\":\"%s\",\"city\":\"%s\",\"state\":\"%s\",\"zip\":\"%s\",\"phone1\":\"%s\",\"phone2\":\"%s\",\"email\":\"%s\",\"department\":\"%s\"}\n", $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);}' >sample.json
