require 'sinatra'
require 'sinatra/reloader'

get '/' do
	erb :home
end

get '/singleIntro' do
	erb :singleIntro
end

get '/single' do
	erb :single
end

get '/versusIntro' do
	erb :versusIntro
end

get '/versus' do
	erb :versus
end

get '/gameover' do
	erb :gameover
end
