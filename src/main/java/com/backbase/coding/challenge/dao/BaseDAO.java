package com.backbase.coding.challenge.dao;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

@Stateless
@TransactionAttribute(TransactionAttributeType.MANDATORY)
public class BaseDAO<T> {

	@PersistenceContext(unitName = "Kalah-persistence-unit")
	EntityManager em;

	public T saveEntity(T t) throws RemoteException {

		try {
			this.em.persist(t);
			this.em.flush();
			this.em.refresh(t);
		} catch (Exception e) {
			e.printStackTrace();
			if (e.getCause() != null) {
				throw new RemoteException(e.getCause().getMessage());
			} else {
				throw new RemoteException(e.getMessage());
			}
		}
		return t;
	}

	public T saveInTransaction(T t) throws RemoteException {
		try {
			this.em.persist(t);
			this.em.refresh(t);
		} catch (Exception e) {
			e.printStackTrace();
			if (e.getCause() != null) {
				throw new RemoteException(e.getCause().getMessage());
			} else {
				throw new RemoteException(e.getMessage());
			}
		}

		return t;
	}

	public void clearContext() {
		em.clear();
	}

	public void refresh(T t) {
		this.em.refresh(t);
	}

	public void clearCache() {
		this.em.getEntityManagerFactory().getCache().evictAll();
	}

	@SuppressWarnings("unchecked")
	public T findById(Class<?> type, Object id) {
		return (T) this.em.find(type, id);
	}

	public T findByIdWithInference(Object id) {
		T result = null;
		ParameterizedType parameterizedType = (ParameterizedType) this.getClass().getGenericSuperclass();

		Type type = parameterizedType.getActualTypeArguments()[0];

		try {
			result = findById(Class.forName(type.toString().substring(6)), id);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

		return result;
	}

	public void removeEntity(Class<?> type, Object id) {
		Object ref = this.em.getReference(type, id);
		this.em.remove(ref);
	}

	public void removeWithSearch(Class<?> type, Object id) {
		T t = findById(type, id);
		this.em.remove(t);
	}

	public List<T> removeList(List<T> lObject, Class<T> clase) {

		List<T> lObjEliminados = new ArrayList<T>();

		for (int i = 0; i < lObject.size(); i++) {
			try {
				T ref = (T) em.getReference(clase, lObject.get(i));

				removeEntity(clase, lObject.get(i));

				lObjEliminados.add(ref);
			} catch (Exception e) {
				em.getTransaction().setRollbackOnly();
			}

		}

		return lObjEliminados;

	}

	public T updateEntity(T t) {
		this.em.merge(t);
		this.em.flush();
		this.em.refresh(t);
		return t;
	}

	public T updateWithoutRefresh(T t) {
		this.em.merge(t);
		this.em.flush();
		return t;
	}

	public void flush() {
		this.em.flush();
	}

	@SuppressWarnings("unchecked")
	public List<T> findByNamedQuery(String namedQuery) {
		Query query = em.createNamedQuery(namedQuery);
		query.setHint("org.hibernate.cacheMode", "REFRESH");

		return query.getResultList();
	}

	public List<T> findByNamedQuery(String namedQuery, Map<String, Object> parameters) {
		return findByNamedQuery(namedQuery, parameters, 0);
	}

	@SuppressWarnings("unchecked")
	public List<T> findByNamedQuery(String namedQuery, int resultLimit) {
		Query query = em.createNamedQuery(namedQuery);
		query.setHint("org.hibernate.cacheMode", "REFRESH");

		return query.setMaxResults(resultLimit).getResultList();
	}

	@SuppressWarnings("unchecked")
	public List<T> findWithNativeQuery(String nativeQuery, Class<T> type) {
		return this.em.createNativeQuery(nativeQuery, type).getResultList();
	}

	@SuppressWarnings("unchecked")
	public List<Object[]> findWithNativeQuery(String consulta) {

		List<Object[]> resultado;
		Query query = this.em.createNamedQuery(consulta);
		resultado = query.getResultList();
		return resultado;

	}

	@SuppressWarnings("unchecked")
	public List<Object[]> findWithNativeQuery(String consulta, Object... pParams) {

		Query query = this.em.createNamedQuery(consulta);
		int contParam = 1;

		for (Object object : pParams) {
			query.setParameter(contParam, object);
			contParam++;
		}

		return query.getResultList();

	}

	@SuppressWarnings("unchecked")
	public List<Object[]> findWithNativeQueryLimit(String consulta, int maxLimit, Object... pParams) {

		Query query = this.em.createNamedQuery(consulta);
		int contParam = 1;

		for (Object object : pParams) {
			query.setParameter(contParam, object);
			contParam++;
		}

		query.setMaxResults(maxLimit);

		return query.getResultList();

	}

	@SuppressWarnings("unchecked")
	public List<T> findByNamedQuery(String namedQuery, Map<String, Object> parameters, int resultLimit) {
		Set<Entry<String, Object>> rawParameters = parameters.entrySet();
		Query query = this.em.createNamedQuery(namedQuery);
		if (resultLimit > 0)
			query.setMaxResults(resultLimit);
		for (Entry<String, Object> entry : rawParameters) {
			query.setParameter(entry.getKey(), entry.getValue());
		}

		query.setHint("org.hibernate.cacheMode", "REFRESH");

		return query.getResultList();
	}

	@SuppressWarnings("unchecked")
	public T findOnlyRecord(String namedQuery, Map<String, Object> parameters) throws RemoteException {
		Object obj = null;
		T t = null;
		Set<Entry<String, Object>> rawParameters = parameters.entrySet();
		Query query = this.em.createNamedQuery(namedQuery);

		for (Entry<String, Object> entry : rawParameters) {
			query.setParameter(entry.getKey(), entry.getValue());
		}

		query.setHint("org.hibernate.cacheMode", "REFRESH");

		try {
			obj = query.getSingleResult();
		} catch (NoResultException e) {
		} catch (Exception e) {
			System.out.println("Advertencia en  buscarRegistroUnico");
			/**
			 * En caso de haber un error en la consulta manejamos la excepción
			 */
			e.printStackTrace();
			if (e.getCause() != null) {
				throw new RemoteException(e.getCause().getMessage());
			} else {
				throw new RemoteException(e.getMessage());
			}

		}

		if (obj != null) {
			t = (T) obj;
		}

		return t;
	}

	@SuppressWarnings("unchecked")
	public T findOnlyRecord(String namedQuery, String column, Object valor) {
		Object obj = null;
		T t = null;
		Query query = this.em.createNamedQuery(namedQuery);

		query.setParameter(column, valor);
		query.setHint("org.hibernate.cacheMode", "REFRESH");
		try {
			obj = query.getSingleResult();
		} catch (NoResultException e) {

		}

		if (obj != null) {
			t = (T) obj;
		}
		return t;
	}

	@SuppressWarnings("unchecked")
	public T findOnlyRecorByProperty(String propertyName, final Object value) {
		Object obj = null;
		T t = null;
		ParameterizedType parameterizedType = (ParameterizedType) this.getClass().getGenericSuperclass();

		String type = parameterizedType.getActualTypeArguments()[0].toString();
		type = type.substring(type.lastIndexOf(".") + 1);
		try {
			final String queryString = "select model from " + type + " model where model." + propertyName
					+ "= :propertyValue";
			Query query = em.createQuery(queryString);
			query.setParameter("propertyValue", value);
			query.setHint("org.hibernate.cacheMode", "REFRESH");
			try {
				obj = query.getSingleResult();
			} catch (NoResultException e) {

			}

			if (obj != null) {
				t = (T) obj;
			}

			return t;
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@SuppressWarnings("unchecked")
	public T findByOnlyRecord(String namedQuery) {
		Object obj = null;
		T t = null;

		try {
			obj = this.em.createNamedQuery(namedQuery).getSingleResult();
		} catch (NoResultException e) {

		}

		if (obj != null) {
			t = (T) obj;
		}

		return t;
	}

	@SuppressWarnings("unchecked")
	public List<T> findByOnlyProperty(String propertyName, final Object value) {
		ParameterizedType parameterizedType = (ParameterizedType) this.getClass().getGenericSuperclass();
		String type = parameterizedType.getActualTypeArguments()[0].toString();
		type = type.substring(type.lastIndexOf(".") + 1);

		try {
			final String queryString = "select model from " + type + " model where model." + propertyName
					+ "= :propertyValue";
			Query query = em.createQuery(queryString);
			query.setParameter("propertyValue", value);
			return query.getResultList();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@SuppressWarnings("unchecked")
	public List<T> findByPropertyInOrder(String propertyName, final Object value, String propertyOrderName,
			boolean ascending) {
		ParameterizedType parameterizedType = (ParameterizedType) this.getClass().getGenericSuperclass();
		String type = parameterizedType.getActualTypeArguments()[0].toString();
		type = type.substring(type.lastIndexOf(".") + 1);

		try {
			final String queryString = "select model from " + type + " model where model." + propertyName
					+ "= :propertyValue order by model." + propertyOrderName + " " + (ascending ? "asc" : "desc");
			Query query = em.createQuery(queryString);
			query.setParameter("propertyValue", value);
			query.setHint("org.hibernate.cacheMode", "REFRESH");
			return query.getResultList();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@SuppressWarnings("unchecked")
	public List<T> buscarPorPropiedadConMultiplesOrden(String propertyName, final Object value,
			String[] propertiesOrderName, boolean ascending) {
		ParameterizedType parameterizedType = (ParameterizedType) this.getClass().getGenericSuperclass();
		String type = parameterizedType.getActualTypeArguments()[0].toString();
		type = type.substring(type.lastIndexOf(".") + 1);

		try {
			String queryOrder = "";
			for (String propertyOrderName : propertiesOrderName) {
				queryOrder = queryOrder + (queryOrder.isEmpty() ? "" : ",") + " model." + propertyOrderName;
			}

			final String queryString = "select model from " + type + " model where model." + propertyName
					+ "= :propertyValue order by " + queryOrder + " " + (ascending ? "asc" : "desc");
			Query query = em.createQuery(queryString);
			query.setParameter("propertyValue", value);
			query.setHint("org.hibernate.cacheMode", "REFRESH");
			return query.getResultList();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@SuppressWarnings("unchecked")
	public List<T> finbByProperties(Map<String, Object> parameters, int resultLimit) {

		ParameterizedType parameterizedType = (ParameterizedType) this.getClass().getGenericSuperclass();
		String type = parameterizedType.getActualTypeArguments()[0].toString();
		type = type.substring(type.lastIndexOf(".") + 1);
		Set<Entry<String, Object>> rawParameters = parameters.entrySet();
		String queryString = "select model from " + type + " model where model.";

		int cont = 0;
		int totKeys = rawParameters.size();

		for (Entry<String, Object> entry : rawParameters) {
			if (cont < totKeys) {
				queryString += entry.getKey() + " = :propertyValue" + cont;
				cont++;
				queryString += (cont < (totKeys)) ? " and model." : "";

			}
		}

		cont = 0;

		try {
			Query query = em.createQuery(queryString);
			for (Entry<String, Object> entry : rawParameters) {
				query.setParameter("propertyValue" + cont, entry.getValue());
				cont++;
			}

			if (resultLimit > 0) {
				query.setMaxResults(resultLimit);
			}

			query.setHint("org.hibernate.cacheMode", "REFRESH");

			return query.getResultList();

		} catch (RuntimeException re) {
			throw re;
		}
	}

}
