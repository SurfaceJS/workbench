module.exports = 
[
    { name: 'core',                 dependencies: [] },
    { name: 'common',               dependencies: ['core'] },
    { name: 'compiler',             dependencies: ['core', 'common'] },
    { name: 'html-template-plugin', dependencies: ['core', 'common'] },
    { name: 'enumerable',           dependencies: ['core'] },
    { name: 'custom-element',       dependencies: ['core', 'enumerable'] },
];