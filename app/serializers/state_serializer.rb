class StateSerializer < ActiveModel::Serializer
  attributes :name, :pop_at_risk, :reincarcerated, :percent, :abbreviation
end

def fill_color
  case object.percent
  when 0..8 then
    "LOW"
  when 9..16 then
    "MEDIUM"
  else
    "HIGH"
  end
end

#clean up what you want to see in JSON
