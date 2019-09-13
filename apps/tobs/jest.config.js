module.exports = {
  name: 'tobs',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/tobs',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
