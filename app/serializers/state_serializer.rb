class StateSerializer < ActiveModel::Serializer
  attributes :name, :pop_at_risk, :reincarcerated, :percent, :abbreviation
end

#clean up what you want to see in JSON
