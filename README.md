Es una pequeña prueba de una aplicación web donde uso nestJs para el back y react para el front, para poder probarla tienes que descargar ambos proyectos, ejecutar el comando npm i, en el proyecto del back tienes que configurar una base de datos para que se conecte ya que no lo subí a ningún servidor.

Haré un breve resumen de la funcionalidad de la aplicación:
-En la parte back: Para los asteroides consumo la api externa, no lo guardo en una bbdd porque quiero siempre tener los datos actualizados así que prefiero consumirlos de la api externa. El ep para obtener la lista de asteroides está hecho para recibir estos parámetros: sortingCriteria(le puedes pasar un campo para que sean ordenados por el mismo), startDate(le pasas la fecha desde la que quieres empezar a buscar) y endDate(le pasas la fecha hasta la que quieres buscar). La api externa tiene ciertas limitaciones con el tema de las fechas, por cuestiones de tiempo y sencillez, acá tienes dos fechas que funcionan por si se quiere probar (startDate=2014-09-07 endDate=2014-09-08).
Cree una bbdd de usuarios para que un usuario se pueda registrar y/o iniciar sesión, como es solo una prueba no usé JWT ni muchas complicaciones, una vez iniciada la sesión se pueden guardar asteroides como favoritos, guardo una lista de ids de los asteroides para que cuando sea solicitada por el front reciba los ids de los favoritos y se puedan buscar los detalles de cada asteroide con el ep que generé para buscar los detalles.

-En la parte front: Es una SPA, no uso rutas porque es muy pequeño el proyecto. Cuando la aplicación carga te trae la lista de asteroides que me trae por defecto en la url que me facilitaron, tienes la opción de registrarte si no tienes cuenta o iniciar sesión si ya posees una, una vez iniciada sesión puedes guardar en favoritos y si ya tienes guardados en favoritos alguno de los asteroides que aparecen por defecto se te marcará automaticamente. Puedes guardar tantos como quieras. Puedes elegir cómo los quieres ordenar y las fechas que buscarás y presionar el botón de buscar. También podrás ver los detalles de cada asteroide presionando en el botón "show details", el cual abrirá un modal mostrando los detalles del asteroide seleccionado.


Con respecto a la consulta SQL solicitada, acá está la respuesta:

SELECT U.NAME, U.EMAIL, SUM(O.QUANTITY * P.PRICE) AS TOTAL
FROM USERS AS U, PRODUCTS AS P, ORDERS AS O
WHERE U.ID = O.USER_ID AND P.ID = O.PRODUCT_ID AND P.CATEGORY = "ELECTRONICS"
GROUP BY U.ID
HAVING COUNT(DISTINCT O.ID) >= 3 AND TOTAL > 1000
ORDER BY TOTAL DESC;
