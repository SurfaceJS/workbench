export interface Configuration
{
    port:          number;
    wwwRoot:       string;    
    defaultRoute?: string;
    notFound?:     string;
}