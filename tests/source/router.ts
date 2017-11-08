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
        '/api/{controller}/{action}',
        '/api/{controller}/{action}/{id?}'
    ];

    let router = Router.create(RoutingType.Abstract, routes);

    console.log(router.match('/home'));
    console.log(router.match('/home/about'));
    console.log(router.match('/home/about/1'));
    console.log(router.match('/adm/home/about/1'));
}