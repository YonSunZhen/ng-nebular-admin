import { environment } from 'src/environments/environment';

/**********************************************************************/
/* public local url -> http://localhost:8080                      */
/**********************************************************************/
// let HOST_URL_V2 = 'http://localhost:8080/v2/wx';

/**********************************************************************/
/* public service url -> https://itc.desaysv.com/api                */
/**********************************************************************/
// let HOST_URL_V2 = 'https://itc.desaysv.com/api/v2/wx';

/**********************************************************************/
/* public develop url -> https://itc.desaysv.com/api/develop        */
/**********************************************************************/
let HOST_URL_V2 = 'https://itc.desaysv.com/api/develop/v2/wx';
// let HOST_URL_V2 = 'https://itc.desaysv.com/api/v2/wx';

if (environment.production) {
    HOST_URL_V2 = 'https://itc.desaysv.com/api/v2/wx';
}
export { HOST_URL_V2 };