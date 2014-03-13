require 'csv' #csv library that comes with Ruby
require 'states'

class ImportRecid
  def self.import
    data = CSV.read("#{Rails.root}/data/ppus07st/ppus07st06.csv")

    data.each do |row|
      if row[1].present? && STATES.include?(row[1].strip)
        row.compact!
        state_name = row[0].strip
        state_abbrev = STATES[state_name]
        puts "State row is #{row}"
        State.create!(name: row[0], pop_at_risk: row[1].gsub(/,/,'').to_i, reincarcerated: row[2].gsub(/,/,'').to_i, percent: row[3].to_f, abbreviation: state_abbrev)
      end
    end
  end
end
