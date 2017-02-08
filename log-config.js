import winston from 'winston'; 

export default new winston.Logger({
    level: 'verbose',
    transports: [
      new winston.transports.Console({
        timestamp: true
      }),
      new winston.transports.File({
        filename: 'logfile.log',
        timestamp: true
      })
    ]
  });


