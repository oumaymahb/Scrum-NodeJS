var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var JiraApi = exports.JiraApi = function(protocol, host, port, username, password, apiVersion, verbose, strictSSL, oauth) {
    this.protocol = protocol;
    this.host = host;
    this.port = port;
    this.username = username;
    this.password = password;
    this.apiVersion = apiVersion;
    this.getProject = function(project, callback) {

        var options = {
            rejectUnauthorized: this.strictSSL,
            uri: this.makeUri('/project/' + project),
            method: 'GET'
        };

        this.doRequest(options, function(error, response, body) {

            if (error) {
                callback(error, null);
                return;
            }

            if (response.statusCode === 404) {
                callback('Invalid project.');
                return;
            }

            if (response.statusCode !== 200) {
                callback(response.statusCode + ': Unable to connect to JIRA during getProject.');
                return;
            }

            body = JSON.parse(body);
            callback(null, body);

        });
    };
     /**
     * Finds the Rapid View that belongs to a specified project.
     *
     * @param projectName
     * @param callback
     */
    this.findRapidView = function(projectName, callback) {

        var options = {
          rejectUnauthorized: this.strictSSL,
          uri: this.makeUri('/rapidviews/list', 'rest/greenhopper/'),
          method: 'GET',
          json: true
        };

        this.doRequest(options, function(error, response) {

          if (error) {
              callback(error, null);
              return;
          }

          if (response.statusCode === 404) {
            callback('Invalid URL');
            return;
          }

          if (response.statusCode !== 200) {
            callback(response.statusCode + ': Unable to connect to JIRA during rapidView search.');
            return;
          }

          if (response.body !== null) {
            var rapidViews = response.body.views;
            for (var i = 0; i < rapidViews.length; i++) {
              if(rapidViews[i].name.toLowerCase() === projectName.toLowerCase()) {
                callback(null, rapidViews[i]);
                return;
              }
            }
          }
        

      });
    }
}
    module.exports = router;