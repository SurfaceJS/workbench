export default interface IPackage
{
    dependencies:    Array<Object>;
    devDependencies: Array<Object>;
    name:            string;
    version:         string;
}