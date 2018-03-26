
aggs = {
        results: {
          filter: {bool: {filter: filters}},
          aggs: {
            hits: {cardinality: {field: "field.keyword"}},
            aggs_results: {
              terms: {field: "field.keyword", size: 100},
              aggs: {
                agg_result: {
                  top_hits: {
                    sort: [{score_field: {order: "desc"}}],
                    size: 1
                  }
                }
              }
            }
          }
        },
        facets:{
          filter: {bool: {filter: new_filter}},
          aggs:{
            type: {
              terms: {field: facet, size: 40, order: {type_count: "desc"}},
              aggs: {
                type_count: {
                  cardinality: {field: "field.keyword"}
                }
              }
            }
          }
        }
      };
      
client.search({
    index: `index_name`,
    body: {
      query: {bool: {filter: filters}},
      size: 0,
      aggs: aggs
    }
  }).then(function(result){
    console.log(result)
    return result
  }, function(err){
    return {error: true, error_msg: err.message}
  });
