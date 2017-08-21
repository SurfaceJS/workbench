module.exports = 
[
    { name: 'common',               dependencies: [] },
    { name: 'compiler',             dependencies: ['common'] },
    { name: 'enumerable',           dependencies: ['common'] },
    { name: 'custom-element',       dependencies: ['common', 'enumerable'] },
];