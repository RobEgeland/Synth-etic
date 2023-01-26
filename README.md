# Synth-etic

Welcome to Synth-etic, a fully web based synthesizer

## How to Use

* play Synth-etic like a piano with the keyboard using the keys [a - '] for the white keys and [W, E, T, Y, U, O, P] for the black keys

* sign up on the corresponding tab to save sounds you've created 

* play sounds others have created on the explore tab

* read the How-To tab to get an idea of what all the knobs do

## Versions 
this app requires ruby version 3.1.0, as well as rails 7.0.4

```
$ rvm install "ruby-3.1.0"
$ rvm install "rails-7.0.4"
```

## Ruby dependencies
this app uses Postgresql for its database, bcrypt for password encryption

```
$ gem install pg
$ gem install bcrypt
```

## Starting postgres

```
$sudo service postgresql start
```

## Creating a new database

```
$ rails db:create
```
