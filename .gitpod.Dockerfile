FROM gitpod/workspace-full

RUN wget https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb

RUN sudo dpkg -i packages-microsoft-prod.deb

RUN rm packages-microsoft-prod.deb

RUN sudo apt update

RUN sudo apt --yes install dotnet-sdk-3.1
