# 🚀 Guide Complet : Système CI/CD (FastAPI + React + Kubernetes)

Ce guide est conçu pour vous accompagner pas-à-pas dans la mise en place de votre infrastructure DevOps, même si vous débutez.

---

## 📋 Prérequis (À installer sur votre ordinateur)

1.  **Git** : Pour envoyer votre code sur GitHub.
2.  **Docker Desktop** (ou Docker Engine) : Pour tester les containers localement.
3.  **kubectl** : L'outil de commande pour parler à Kubernetes.
4.  **Helm** : Le gestionnaire de paquets pour Kubernetes.
5.  **Un Cluster Kubernetes** :
    *   *Option Débutant* : Installez **Minikube** ou **Kind** sur votre PC.
    *   *Option Cloud* : Google GKE, Amazon EKS, Azure AKS ou DigitalOcean K8s.

---

## 🛠️ Étape 1 : Envoyer le code sur GitHub

1.  Créez un nouveau dépôt vide sur votre compte GitHub (nommez-le `ci-cd-project` par exemple).
2.  Dans votre terminal, à la racine du projet :
    ```bash
    git init
    git add .
    git commit -m "Initial commit: CI/CD Infrastructure"
    git branch -M main
    git remote add origin https://github.com/VOTRE_NOM_UTILISATEUR/VOTRE_DEPOT.git
    git push -u origin main
    ```

---

## 🔐 Étape 2 : Configurer les Secrets GitHub

Pour que GitHub puisse déployer sur votre cluster, il a besoin d'une "clé".

1.  Récupérez votre fichier de configuration Kubernetes (souvent situé dans `~/.kube/config`).
2.  Sur GitHub, allez dans votre dépôt : **Settings > Secrets and variables > Actions**.
3.  Cliquez sur **New repository secret** :
    *   **Name** : `KUBE_CONFIG`
    *   **Value** : Copiez-collez tout le contenu de votre fichier `config`.
4.  Ajoutez également (si nécessaire) :
    *   `POSTGRES_PASSWORD` : Un mot de passe pour votre base de données.

---

## 🌐 Étape 3 : Configurer les Environnements

C'est ici que l'on définit les règles de déploiement.

1.  Allez dans **Settings > Environments**.
2.  Cliquez sur **New environment** et créez :
    *   `staging` : (Pas de règle particulière).
    *   `production` : Cochez **Required reviewers** et ajoutez votre nom. Cela vous obligera à cliquer sur "Approve" pour que le déploiement se lance.

---

## 🧪 Étape 4 : Tester localement avec Docker Compose

Avant de tout envoyer sur le cloud, vérifiez que le projet fonctionne sur votre PC :

```bash
cd deploy
docker-compose up --build
```
*   Accédez au **Backend** : `http://localhost:8000/docs` (Documentation interactive).
*   Accédez au **Frontend** : `http://localhost:8080` (L'interface qui parle au backend).

---

## 🔄 Étape 5 : Comprendre le cycle de vie (Workflow)

Voici comment votre code voyage :

### 1. Vous créez une branche (Feature)
```bash
git checkout -b feature/ma-nouvelle-idee
# Faites vos changements...
git commit -m "Ajout d'une fonctionnalité"
git push origin feature/ma-nouvelle-idee
```
Sur GitHub, ouvrez une **Pull Request (PR)**.
*   **Action** : GitHub lance les tests et déploie une **Review App** (une version temporaire de votre app pour tester).
*   **URL** : `https://review-PR-XX.myapp.com`

### 2. Le Merge (Validation)
Une fois la PR acceptée et fusionnée dans `main` :
*   **Action** : GitHub reconstruit les images, lance les scans de sécurité, et déploie sur **Staging**.
*   **URL** : `https://staging.myapp.com`

### 3. La Mise en Production (Release)
Quand vous êtes prêt, créez un "Tag" :
```bash
git tag v1.0.0
git push origin v1.0.0
```
*   **Action** : Le pipeline demande une **approbation manuelle**. Une fois validé, il déploie sur le domaine final.
*   **URL** : `https://myapp.com`

---

## 🚨 Dépannage pour Débutants

*   **Le pipeline échoue au build ?** Vérifiez vos `Dockerfile`.
*   **Le déploiement Kubernetes échoue ?** Vérifiez que le secret `KUBE_CONFIG` est correct et que votre cluster est accessible.
*   **Le Frontend ne voit pas le Backend ?** Vérifiez la variable `VITE_API_URL` dans le pipeline ou l'Ingress.

---

*Félicitations ! Vous venez de passer du statut de développeur à celui de DevOps Apprentice. 🎉*