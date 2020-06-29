var _ = require('lodash');
var data_set_splitter = require('./data_set_splitter')
var shannon_entropy = require('./shannon_entropy')
/**
* This function will select the best feature for splittingwith the help
* of the shannon entropy
* @method get_the_best_feature_for_splitting
* @param  {Array}                           data  A dataset of training, an array conposed of object with a property "label" that represents the class
* @return {String}                                The name of the best feature for splitting (the property name)
*/
var  get_the_best_feature_for_splitting= function(data){
  // we compute the Entropy
  var base_entropy_value = shannon_entropy.calculate_shannon_entropy(data)
  // init a variable that will contain the best informational gain value
  var best_informational_gain_value = 0
  // init a variable that will contain the best feature choice for splitting
  var best_feature_name = ""
  // we iterate through our features (we take the first data element)
  _.forEach(data[0], function(value_of_feature, feature_name) {
    if(feature_name != "label"){
      // get the unique values of each feature
      var unique_values_of_this_feature = _.uniq(_.map(data, feature_name));
      // init a variable that will contain the new_entropy_value
      var new_entropy_value = 0;
      // iterate through each possible value of this feature
      _.forEach(unique_values_of_this_feature, function(value_of_this_feature, key) {
        var  data_set_without_this_feature_of_value = data_set_splitter.split_the_dataset_by_feature_and_value(data,feature_name,value_of_this_feature)
        var p = parseFloat(data_set_without_this_feature_of_value.length/data.length)
        new_entropy_value += p*shannon_entropy.calculate_shannon_entropy(data_set_without_this_feature_of_value)
      })
      // we can now have the informational gain for this specific feature
      var informational_gain_value = base_entropy_value - new_entropy_value
      // if the informational gain value is higher than the best one
      if(informational_gain_value > best_informational_gain_value){
        // it now become the best informational gain
        best_informational_gain_value = informational_gain_value
        // and the best feature has to be keep in memory
        best_feature_name = feature_name
      }
    }
  });
  return best_feature_name;
}
get_the_best_feature_for_splitting(a)
// returns "has_a_car"
module.exports = {
  get_the_best_feature_for_splitting:get_the_best_feature_for_splitting
}