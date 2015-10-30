require 'sinatra'
require 'sinatra/reloader'

get '/' do
	erb :home
end

get '/single' do
	erb :single
end

get '/singleIntro' do
	erb :singleIntro
end

get '/versus' do
	erb :versus
end

get '/gameover' do
	erb :gameover
end
