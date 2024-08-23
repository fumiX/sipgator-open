package de.fumix.sipgator.common.api

interface PermissionRequirement {
  fun satisfiedByScopes(scopes: Collection<Scope>): Boolean

  infix fun or(other: PermissionRequirement): PermissionRequirement = object : PermissionRequirement {
    override fun satisfiedByScopes(scopes: Collection<Scope>): Boolean = satisfiedByScopes(scopes) || other.satisfiedByScopes(scopes)
  }
  infix fun and(other: PermissionRequirement): PermissionRequirement = object : PermissionRequirement {
    override fun satisfiedByScopes(scopes: Collection<Scope>): Boolean = satisfiedByScopes(scopes) && other.satisfiedByScopes(scopes)
  }

  companion object {
    val NO_PERMISSION_NEEDED = object: PermissionRequirement {
      override fun satisfiedByScopes(scopes: Collection<Scope>): Boolean = true
    }
    val PERMITTED_TO_NOONE = object: PermissionRequirement {
      override fun satisfiedByScopes(scopes: Collection<Scope>): Boolean = false
    }
  }
}
