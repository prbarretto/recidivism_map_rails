require_relative "../import_recid_data"


namespace :import do
  desc "Import recidivism data"
  task recid_data: :environment do
    #invokes the environment task before this recid_data task.
    #environment task makes the app's info available to the ruby we'll write in this task.
    ImportRecid.import
  end

  desc "Clear state db data"
  task clear_states: :environment do
    State.delete_all
  end
end
