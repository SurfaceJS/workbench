import { Router, RoutingType } from '@surface/router';

export function execute()
{
    let routes =
    [
        '/{controller}',
        '/{controller=home}/{action=index}/{id=1}',
        '/{controller}/*/{action}/{id?}',
        '/{area}/{controller}/{action}/{id?}',
        '/api/{controller}',
        '/api/{controller=home}/{action=index}/{id=1}',
        '/api/{controller}/*/{action}/{id?}',
        '/api/{controller}/{action}/{id?}'
    ];

    let router = Router.create(RoutingType.Abstract, routes);

    console.log('case 1: ', router.match('/home'));
    console.log('case 2: ', router.match('/home/about'));
    console.log('case 3: ', router.match('/home/about/2'));
    console.log('case 4: ', router.match('/adm/home/about/1'));
}