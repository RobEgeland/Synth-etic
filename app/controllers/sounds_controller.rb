class SoundsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid

    def create 
        sound = Sound.create!(sound_params)
        params[:effects].each do |effect|
            effect = Effect.create!(name: effect[:current][:name], wet: effect[:current][:wet])
            Soundeffect.create!(sound_id: sound.id, effect_id: effect.id)
        end
        render json: sound, status: :created
    end

    private

    def sound_params
        params.permit(:user_id, :sound_name, :harmonicity, :vibrato_amount, :vibrato_rate, :voice0_oscillator, :voice0_volume, :voice0_portamento, :voice0_attack, :voice0_decay, :voice0_sustain, :voice0_release, :voice1_oscillator, :voice1_volume, :voice1_portamento, :voice1_attack, :voice1_decay, :voice1_sustain, :voice1_release, :effects)
    end


    def render_invalid(invalid) 
        render json: {errors: invalid.record.errors}, status: :unprocessable_entity
    end
end
