class SoundsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid

    def index
        sounds = Sound.all
        render json: sounds, include: [:effects, :user]
    end

    def show
        sound = Sound.find_by!(id: params[:id])
        render json: sound,include: [:effects, :user], status: :ok
    end

    def create 
        sound = Sound.create!(sound_params)
        params[:effects].each do |key, value|
            effect = Effect.create!(name: key, wet: value)
            Soundeffect.create!(sound_id: sound.id, effect_id: effect.id)
        end
        render json: sound, status: :created
    end

    def destroy
        sound = Sound.find_by!(id: params[:id])
        sound.destroy
        render json: sound, status: :ok
    end

    def update
        # need to fix this
        # find out how toi pass id for sound effects
        sound = Sound.find_by!(id: params[:id])
        sound.update(sound_params)
        sound.soundeffects.delete_all
        params[:effects].each do |key, value|
            effect = Effect.find_by!(id: value[1])
            effect.update(wet: value[0])
            Soundeffect.create!(sound_id: sound.id, effect_id: effect.id)
        end
        render json: sound, status: :accepted
    end

    private

    def sound_params
        params.permit(:user_id, :sound_name, :harmonicity, :vibrato_amount, :vibrato_rate, :voice0_oscillator, :voice0_volume, :voice0_portamento, :voice0_attack, :voice0_decay, :voice0_sustain, :voice0_release, :voice1_oscillator, :voice1_volume, :voice1_portamento, :voice1_attack, :voice1_decay, :voice1_sustain, :voice1_release, :effects)
    end


    def render_invalid(invalid) 
        render json: {errors: invalid.record.errors}, status: :unprocessable_entity
    end
end
