### Run mongodb in docker

mkdir ~/data
docker pull mongo
sudo docker run -d -p 27017:27017 -v ~/data:/data/db --name mongodb mongo
docker exec -it mongodb bash
