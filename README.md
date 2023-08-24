# URL Shortener

Projeto de encurtador de link, encurtar URL grandes que deseja compartilhar de forma fácil e prática. 

## Tecnologias utilizadas
- ``Laravel 10``
- ``Vue 3 Composition API``

## Funcionalidades do projeto
- Cadastro e Login.
- Adicionar, Editar e Excluir Link.
- Identificador aleatório ou Escolher um Próprio (Opcional).
- Redirecionamento de link.
- Cron, zera clicks no primeiro dia de cada mês.

Frontend - [Design](https://dribbble.com/shots/17087324-DDSV-Link-Shortener)

## Instalação

**Backend (Laravel)**
```bash
# variavel de ambiente
cp .env.example .env

# instalar pacote
composer install

# Chave
php artisan key:generate

# Tabelas
php artisan migrate --seed

# Iniciar Laravel
php artisan serve

# Cron
php artisan schedule:work

```
**Usando Docker (Opcional)**

```bash
# iniciar docker
docker-compose up -d

# executar comandos, container laravel
docker-compose exec app bash
```

**Frontend (Vue)**
```bash
# instalar pacotes
yarn install

# Iniciar Vu
yarn run dev

# variavel de ambiente
cp .env.example .env

# adicionar endereço da API em .env (exemplo)
# VITE_API_URL=http://localhost:8000/api

```